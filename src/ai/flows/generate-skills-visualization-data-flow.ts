'use server';
/**
 * @fileOverview A Genkit flow for generating structured data from a text description of skills and their proficiency levels,
 * suitable for populating an interactive skills chart.
 *
 * - generateSkillsVisualizationData - A function that triggers the skills data generation process.
 * - GenerateSkillsVisualizationDataInput - The input type for the generateSkillsVisualizationData function.
 * - GenerateSkillsVisualizationDataOutput - The return type for the generateSkillsVisualizationData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillsVisualizationDataInputSchema = z.object({
  skillsText: z
    .string()
    .describe(
      'A text description of skills and their proficiency levels. Example: "JavaScript: Expert, TypeScript: Proficient, Figma: Intermediate".'
    ),
});
export type GenerateSkillsVisualizationDataInput = z.infer<
  typeof GenerateSkillsVisualizationDataInputSchema
>;

const SkillDataSchema = z.object({
  name: z.string().describe('The name of the skill.'),
  proficiency: z
    .number()
    .min(0)
    .max(100)
    .describe('The proficiency level of the skill, on a scale of 0 to 100.'),
  category: z
    .string()
    .optional()
    .describe('The category the skill belongs to, if specified in the input.'),
});

const GenerateSkillsVisualizationDataOutputSchema = z.object({
  skills: z
    .array(SkillDataSchema)
    .describe(
      'An array of structured skill data, each with a name, proficiency, and optional category.'
    ),
});
export type GenerateSkillsVisualizationDataOutput = z.infer<
  typeof GenerateSkillsVisualizationDataOutputSchema
>;

export async function generateSkillsVisualizationData(
  input: GenerateSkillsVisualizationDataInput
): Promise<GenerateSkillsVisualizationDataOutput> {
  return generateSkillsVisualizationDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSkillsVisualizationDataPrompt',
  input: {schema: GenerateSkillsVisualizationDataInputSchema},
  output: {schema: GenerateSkillsVisualizationDataOutputSchema},
  prompt: `You are an AI assistant tasked with converting a text description of a person's skills and their proficiency levels into a structured JSON format.

The proficiency levels should be mapped to a numerical scale from 0 to 100 as follows:
- Expert: 100
- Proficient: 75
- Intermediate: 50
- Beginner: 25
- Novice: 10

If categories are provided (e.g., "Frontend", "Backend", "Tools"), include them in the 'category' field for each skill. If no category is explicitly mentioned for a skill, you can leave the 'category' field as undefined or null.

Input Skills Description:
{{{skillsText}}}

Generate the JSON output representing the skills data.`,
});

const generateSkillsVisualizationDataFlow = ai.defineFlow(
  {
    name: 'generateSkillsVisualizationDataFlow',
    inputSchema: GenerateSkillsVisualizationDataInputSchema,
    outputSchema: GenerateSkillsVisualizationDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate skills visualization data.');
    }
    return output;
  }
);
