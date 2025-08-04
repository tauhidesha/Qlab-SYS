import { updateRepaintDetailsTool } from '../tools/updateRepaintDetailsTool';
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
import { triggerBosMatTool } from '../tools/impl/triggerBosMamatTool';
import { extractBookingDetailsTool } from '../tools/extractBookingDetailsTool'; // ✅ tambahkan ini kalau belum
import { searchKnowledgeBaseTool } from '../tools/searchKnowledgeBaseTool';
import { updateCartToolDefinition, updateCartToolImplementation } from '../tools/updateCartTool';
import { analyzeMotorImageTool } from '../tools/vision/analyzeMotorImage'; // 🔥 NEW: AI Vision
import { detectConversationRelevanceTool } from '../tools/conversation/detectConversationRelevance'; // 🔥 NEW: Conversation Management
import { getStudioInfoTool } from '../tools/getStudioInfoTool'; // 🔥 NEW: Studio Info Tool

import { masterPrompt } from './aiPrompts';

export const zoyaTools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
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
  extractBookingDetailsTool.toolDefinition, // ✅ daftar ke GPT
  searchKnowledgeBaseTool.toolDefinition,
  updateRepaintDetailsTool.toolDefinition,
  getStudioInfoTool.toolDefinition, // 🔥 NEW: Studio Info Tool
  {
    type: 'function',
    function: {
      name: analyzeMotorImageTool.name,
      description: analyzeMotorImageTool.description,
      parameters: {
        type: 'object',
        properties: {
          imageUrl: {
            type: 'string',
            format: 'uri',
            description: 'URL gambar motor yang akan dianalisis'
          },
          analysisType: {
            type: 'string',
            enum: ['condition', 'damage', 'color', 'license_plate', 'detailing', 'coating', 'general'],
            description: 'Jenis analisis yang diinginkan'
          },
          specificRequest: {
            type: 'string',
            description: 'Permintaan khusus dari customer'
          }
        },
        required: ['imageUrl', 'analysisType']
      }
    }
  }, // 🔥 NEW: AI Vision Tool
  {
    type: 'function',
    function: {
      name: detectConversationRelevanceTool.name,
      description: detectConversationRelevanceTool.description,
      parameters: {
        type: 'object',
        properties: {
          customerMessage: {
            type: 'string',
            description: 'Pesan terakhir dari customer'
          },
          conversationContext: {
            type: 'string',
            description: 'Konteks percakapan sebelumnya'
          }
        },
        required: ['customerMessage']
      }
    }
  }, // 🔥 NEW: Conversation Relevance Tool
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
  triggerBosMatTool: triggerBosMatTool,
  searchKnowledgeBase: searchKnowledgeBaseTool,
  updateRepaintDetailsTool: updateRepaintDetailsTool,
  analyzeMotorImage: analyzeMotorImageTool, // 🔥 NEW: AI Vision
  detectConversationRelevance: detectConversationRelevanceTool, // 🔥 NEW: Conversation Management
  getStudioInfo: getStudioInfoTool, // 🔥 NEW: Studio Info Tool
  updateCart: {
    definition: updateCartToolDefinition,
    implementation: updateCartToolImplementation,
  },
};
