import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { OpenaiService } from '@/services/openai.service';
import { Submission } from '@/interfaces/submission.interface';
import { HttpException } from '@/exceptions/HttpException';
import { ContractsService } from '@/services/contracts.service';
import { CaptchaService } from '@/services/captcha.service';

export class SubmissionController {
  public openai = Container.get(OpenaiService);
  public contracts = Container.get(ContractsService);
  public captcha = Container.get(CaptchaService);

  public submitReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: Omit<Submission, 'timestamp'> = req.body;

      if (!(await this.captcha.validateCaptcha(body.captcha))) {
        throw new HttpException(400, 'Invalid captcha. Please try again.');
      }

      const submissionRequest: Submission = {
        ...body,
        timestamp: Date.now(),
      };

      // Submission validation with smart contract
      await this.contracts.validateSubmission(submissionRequest);
      const prompt = `
                  Analyze the image provided. The image MUST satisfy all of the following criteria:
                  1. It must have a cooked meal
                  2. The meal must have one of the following ingredients [egg, butter, garlic]
                  Please respond using a JSON object without comments and do not add any other descriptions and comments:
                  {
                  'validityFactor': number, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
                  'descriptionOfAnalysis': string, // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria. Remember we are rewarding users that drink coffee in a sustainable way.
                  }
                    `;
      const validationResult = await this.openai.validateImage(body.image, prompt); //open ai used here 

      if (validationResult == undefined || !('validityFactor' in (validationResult as object))) {
        throw new HttpException(500, 'Error validating image');
      }

      const validityFactor = validationResult['validityFactor'];

      if (validityFactor === 1) await this.contracts.registerSubmission(submissionRequest); // block chain

      res.status(200).json({ validation: validationResult });
    } catch (error) {
      next(error);
    }
  };
  public uploadReciept = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: Omit<Submission, 'timestamp'> = req.body;

      if (!(await this.captcha.validateCaptcha(body.captcha))) {
        throw new HttpException(400, 'Invalid captcha. Please try again.');
      }

      const submissionRequest: Submission = {
        ...body,
        timestamp: Date.now(),
      };

      // Submission validation with smart contract
      await this.contracts.validateSubmission(submissionRequest);
      
      const prompt = `
                   Analyze the image provided. The image MUST satisfy all of the following criteria:
                        1. It must have as subject a receipt of purchase of at least one product.
                        3. It must include the date of the purchase.
                        4. It must include the name of the store where the purchase was made.
                    Please respond using a JSON object without comments and do not add any other descriptions and comments:
                   
 Ingredient = {name: string, quantity: number, expiration_date: date}
Ingredients must be food 
 {
                    'validityFactor': 1, //set to one for mock
                    'descriptionOfAnalysis': string, // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria. Remember we are rewarding users that drink coffee in a sustainable way.
                    expiration_date is assuming that the ingredient is fresh from the current date
                    ingredients: Ingredient[]
                    }
                    
                    Merge duplicated ingredients with the same name be sure to add them to sum the quantity
                    `;
      const validationResult = await this.openai.validateImage(body.image, prompt); //open ai used here 

      if (validationResult == undefined || !('validityFactor' in (validationResult as object))) {
        throw new HttpException(500, 'Error validating image');
      }

      // const validityFactor = validationResult['validityFactor'];

      // if (validityFactor === 1) await this.contracts.registerSubmission(submissionRequest); // block chain

      res.status(200).json({ validation: validationResult });
    } catch (error) {
      next(error);
    }
  };
}
