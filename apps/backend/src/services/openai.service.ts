import { HttpException } from '@/exceptions/HttpException';
import { openAIHelper } from '@/server';
import { isBase64Image } from '@/utils/data';
import { Service } from 'typedi';

@Service()
export class OpenaiService {
  public async validateImage(image: string): Promise<unknown> {
    if (!isBase64Image(image)) throw new HttpException(400, 'Invalid image format');

    const prompt = `
                    Analyze the image provided. The image MUST satisfy all of the following criteria:
                        1. It must have a cooked meal
                    Please respond using a JSON object without comments and do not add any other descriptions and comments:
                    {
                    'validityFactor': number, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
                    'descriptionOfAnalysis': string, // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria. Remember we are rewarding users that drink coffee in a sustainable way.
                    }
                    `;

    // const gptResponse = await openAIHelper.askChatGPTAboutImage({
    //   base64Image: image,
    //   prompt,
    // });

    // const responseJSONStr = openAIHelper.getResponseJSONString(gptResponse);
    return {
      'validityFactor': 1,
      'descriptionOfAnalysis': 'The image is a receipt from Walmart with the date of purchase, it contains the names and quantities of the purchased products.',
      'ingredients': [
      {
      'name': 'Apples',
      'quantity': 5,
      'expiration_date': '07/03/2024'
      },
      {
      'name': 'Grapes',
      'quantity': 5,
      'expiration_date': '07/03/2024'
      },
      {
      'name': 'Butter',
      'quantity': 2,
      'expiration_date': '07/03/2024'
      },
      {
      'name': 'Bread',
      'quantity': 3,
      'expiration_date': '07/01/2024'
      }
      ]
      }
    // return openAIHelper.parseChatGPTJSONString(responseJSONStr);
  }
}
