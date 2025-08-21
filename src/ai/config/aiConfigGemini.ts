// @file: src/ai/config/aiConfigGemini.ts

import type { GoogleGenerativeAI } from '@google/generative-ai';

// Import existing tools
import { listServicesByCategoryTool } from '../tools/listServicesByCategoryTool';
import { getSpecificServicePriceTool } from '../tools/getSpecificServicePriceTool';
import { getServiceDescriptionTool } from '../tools/getServiceDescriptionTool';
import { getMotorSizeDetailsTool } from '../tools/getMotorSizeDetailsTool';
import { triggerBosMatTool } from '../tools/impl/triggerBosMamatTool';
import { findNextAvailableSlotTool } from '../tools/findNextAvailableSlotTool';
import { getPromoBundleDetailsTool } from '../tools/getPromoBundleDetailsTool';
import { checkBookingAvailabilityTool } from '../tools/checkBookingAvailabilityTool';
import { matchServiceFromDescriptionTool } from '../tools/impl/matchServiceFromDescriptionTool';
import { createBookingTool } from '../tools/createBookingTool';
import { getRepaintSurchargeTool } from '../tools/getRepaintSurchargeTool';
import { extractBookingDetailsTool } from '../tools/extractBookingDetailsTool';
import { searchKnowledgeBaseTool } from '../tools/searchKnowledgeBaseTool';
import { updateRepaintDetailsTool } from '../tools/updateRepaintDetailsTool';
import { getStudioInfoTool } from '../tools/getStudioInfoTool';
import { searchInternetTool } from '../tools/searchInternetTool';
import { analyzeMotorImageGeminiTool } from '../tools/vision/analyzeMotorImageGemini';

import { masterPrompt } from './aiPrompts';

// Gemini-specific tool definitions
export const zoyaGeminiTools = [
  listServicesByCategoryTool.toolDefinition,
  getSpecificServicePriceTool.toolDefinition,
  getServiceDescriptionTool.toolDefinition,
  getMotorSizeDetailsTool.toolDefinition,
  triggerBosMatTool.toolDefinition,
  findNextAvailableSlotTool.toolDefinition,
  getPromoBundleDetailsTool.toolDefinition,
  checkBookingAvailabilityTool.toolDefinition,
  matchServiceFromDescriptionTool.toolDefinition,
  createBookingTool.toolDefinition,
  getRepaintSurchargeTool.toolDefinition,
  extractBookingDetailsTool.toolDefinition,
  searchKnowledgeBaseTool.toolDefinition,
  updateRepaintDetailsTool.toolDefinition,
  getStudioInfoTool.toolDefinition,
  {
    type: 'function',
    function: {
      name: searchInternetTool.name,
      description: searchInternetTool.description,
      parameters: searchInternetTool.parameters
    }
  },
  {
    type: 'function',
    function: {
      name: analyzeMotorImageGeminiTool.name,
      description: analyzeMotorImageGeminiTool.description,
      parameters: analyzeMotorImageGeminiTool.parameters
    }
  },
];

// Tool function map for Gemini
export const geminiToolFunctionMap: Record<string, Function> = {
  listServicesByCategory: listServicesByCategoryTool.implementation,
  getSpecificServicePrice: getSpecificServicePriceTool.implementation,
  getServiceDescription: getServiceDescriptionTool.implementation,
  getMotorSizeDetails: getMotorSizeDetailsTool.implementation,
  triggerBosMat: triggerBosMatTool.implementation,
  findNextAvailableSlot: findNextAvailableSlotTool.implementation,
  getPromoBundleDetails: getPromoBundleDetailsTool.implementation,
  checkBookingAvailability: checkBookingAvailabilityTool.implementation,
  matchServiceFromDescription: matchServiceFromDescriptionTool.implementation,
  createBooking: createBookingTool.implementation,
  getRepaintSurcharge: getRepaintSurchargeTool.implementation,
  extractBookingDetails: extractBookingDetailsTool.implementation,
  searchKnowledgeBase: searchKnowledgeBaseTool.implementation,
  updateRepaintDetails: updateRepaintDetailsTool.implementation,
  getStudioInfo: getStudioInfoTool.implementation,
  searchInternet: searchInternetTool.implementation,
  analyzeMotorImageGemini: analyzeMotorImageGeminiTool.execute,
};

// Gemini-specific configuration
export const GEMINI_CONFIG = {
  model: 'gemini-2.0-flash-exp',
  temperature: 0.7,
  maxOutputTokens: 2048,
  topP: 0.8,
  topK: 40,
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
  systemPrompt: masterPrompt,
  maxRetries: 3,
  retryDelay: 1000,
};

// Export for backward compatibility
export const zoyaTools = zoyaGeminiTools;
export const toolFunctionMap = geminiToolFunctionMap;
