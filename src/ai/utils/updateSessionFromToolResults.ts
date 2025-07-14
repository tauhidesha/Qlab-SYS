import type { SessionData } from './session';

// This type is based on the normalized tool call structure used across the application.
export type NormalizedToolCall = {
  toolName: string;
  arguments: any;
  id: string;
};

type ToolResponse = {
  tool_call_id: string;
  role: 'tool';
  name: string;
  content: string;
};

export function updateSessionFromToolResults(
  session: SessionData,
  toolCalls: NormalizedToolCall[],
  toolResponses: ToolResponse[]
): SessionData {
  const updatedSession = { ...session };
  if (!updatedSession.inquiry) {
    updatedSession.inquiry = {};
  }

  toolCalls.forEach((toolCall, index) => {
    const toolResponse = toolResponses[index];
    // Safely parse the content if it's a string, otherwise use it directly
    const toolResult = (toolResponse && typeof toolResponse.content === 'string') 
      ? JSON.parse(toolResponse.content) 
      : toolResponse.content;
      
    const args = toolCall.arguments;
    const toolName = toolCall.toolName;

    try {
      if (updatedSession.inquiry) {
        switch (toolName) {
          case 'getMotorSizeDetails': {
            const result = toolResult?.result || {};
            const model = result.matched_model || result.motor_query;
            const general = result.motor_size || result.general_size;
            const repaint = result.repaint_size;

            if (model) updatedSession.inquiry.lastMentionedMotor = model;
            if (['S', 'M', 'L', 'XL'].includes(general)) updatedSession.inquiry.serviceSize = general;
            if (['S', 'M', 'L', 'XL'].includes(repaint)) updatedSession.inquiry.repaintSize = repaint;
            break;
          }

          case 'createBooking': {
            const { customerPhone, serviceName, bookingDate, bookingTime, vehicleInfo } = args;
            updatedSession.inquiry.lastBooking = {
              customerPhone,
              serviceName,
              bookingDate,
              bookingTime,
              vehicleInfo,
              createdAt: Date.now(),
            };
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            break;
          }

          case 'getPromoBundleDetails': {
            updatedSession.inquiry.lastMentionedService = {
              serviceName: 'Repaint Bodi Halus',
              isAmbiguous: false,
            };
            break;
          }

          case 'getSpecificServicePrice': {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            const hasBookingInfo = session.inquiry?.bookingState?.bookingDate !== undefined;
            if (!hasBookingInfo) {
              updatedSession.followUpState = {
                level: 1,
                flaggedAt: Date.now(),
                context: serviceName || 'unknown_service',
              };
            }
            break;
          }

          case 'getRepaintSurcharge': {
            const effect = args.effect;
            const surcharge = toolResult?.result?.surcharge;
            if (effect && typeof surcharge === 'number') {
              updatedSession.inquiry.repaintSurcharge = { effect, surcharge };
            }
            break;
          }

          default: {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            const motorQuery = args.motor_query;
            if (motorQuery && !updatedSession.inquiry.lastMentionedMotor) {
              updatedSession.inquiry.lastMentionedMotor = motorQuery;
            }
            break;
          }
        }
      }
    } catch (err) {
      console.warn(`[updateSessionFromToolResults] Gagal memproses tool call: ${toolName}`, err);
    }
  });

  return updatedSession;
}
