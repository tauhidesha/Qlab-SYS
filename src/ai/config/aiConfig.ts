// @file: src/ai/config/aiConfig.ts

import type { OpenAI } from 'openai';

import { listServicesByCategoryTool } from '../tools/listServicesByCategoryTool';
import { getSpecificServicePriceTool } from '../tools/getSpecificServicePriceTool';
import { getServiceDescriptionTool } from '../tools/getServiceDescriptionTool';
import { getMotorSizeDetailsTool } from '../tools/getMotorSizeDetailsTool';
import { findNextAvailableSlotTool } from '../tools/findNextAvailableSlotTool';
import { getPromoBundleDetailsTool } from '../tools/getPromoBundleDetailsTool';
import { checkBookingAvailabilityTool } from '../tools/checkBookingAvailabilityTool';
import { matchServiceFromDescriptionTool } from '../tools/impl/matchServiceFromDescriptionTool';
import { createBookingTool } from '../tools/createBookingTool';
import { getRepaintSurchargeTool } from '../tools/getRepaintSurchargeTool';
import { triggerBosMamatTool } from '../tools/impl/triggerBosMamatTool';
import { extractBookingDetailsTool } from '../tools/extractBookingDetailsTool'; // ✅ tambahkan ini kalau belum
import { searchKnowledgeBaseTool } from '../tools/searchKnowledgeBaseTool';

import { masterPrompt } from './aiPrompts';

export const zoyaTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  listServicesByCategoryTool.toolDefinition,
  getSpecificServicePriceTool.toolDefinition,
  getServiceDescriptionTool.toolDefinition,
  getMotorSizeDetailsTool.toolDefinition,
  triggerBosMamatTool.toolDefinition,
  findNextAvailableSlotTool.toolDefinition,
  getPromoBundleDetailsTool.toolDefinition,
  checkBookingAvailabilityTool.toolDefinition,
  matchServiceFromDescriptionTool.toolDefinition,
  createBookingTool.toolDefinition,
  getRepaintSurchargeTool.toolDefinition,
  extractBookingDetailsTool.toolDefinition, // ✅ daftar ke GPT
  searchKnowledgeBaseTool.toolDefinition,
];

export const toolFunctionMap = {
  listServicesByCategory: listServicesByCategoryTool,
  getSpecificServicePrice: getSpecificServicePriceTool,
  getServiceDescription: getServiceDescriptionTool,
  getMotorSizeDetails: getMotorSizeDetailsTool,
  findNextAvailableSlot: findNextAvailableSlotTool,
  getPromoBundleDetails: getPromoBundleDetailsTool,
  checkBookingAvailability: checkBookingAvailabilityTool,
  matchServiceFromDescription: matchServiceFromDescriptionTool,
  createBooking: createBookingTool,
  getRepaintSurcharge: getRepaintSurchargeTool,
  extractBookingDetailsTool: extractBookingDetailsTool,
  triggerBosMamatTool: triggerBosMamatTool,
  searchKnowledgeBaseTool: searchKnowledgeBaseTool,
};
