import { createAI } from 'ai/rsc';
import { submitMessage } from './action';

export const AI = createAI({
  actions: {
    submitMessage,
  },
  initialAIState: [],
  initialUIState: [],
});