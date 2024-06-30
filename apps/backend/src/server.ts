import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { initializeOpenAI } from './utils/initializeOpenAI';
import { SubmissionRoute } from './routes/submission.route';
import { FridgeRoute } from './routes/fridge.route';

ValidateEnv();

export const openAIHelper = initializeOpenAI();

const app = new App([new SubmissionRoute(), new FridgeRoute()]);

app.listen();
