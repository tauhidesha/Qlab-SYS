import type { Session } from '../../types/ai';

// This type is based on the normalized tool call structure used across the application.
export type NormalizedToolCall = {
  toolName: string;
  arguments: any;
  id: string;
};

export type ToolResponse = {
  tool_call_id: string;
  role: 'tool';
  name: string;
  content: string;
};

// ...existing code...
export function updateSessionFromToolResults(
  session: Session,
  toolCalls: NormalizedToolCall[],
  toolResponses: ToolResponse[]
): Session {
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
              updatedSession.inquiry.lastMentionedService = [serviceName];
            }
            break;
          }

          case 'getPromoBundleDetails': {
            updatedSession.inquiry.lastMentionedService = ['Repaint Bodi Halus'];
            break;
          }

          case 'getSpecificServicePrice': {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = [serviceName];
            }
            // const hasBookingInfo = session.inquiry?.bookingState?.bookingDate !== undefined;
            // if (!hasBookingInfo) {
            //   updatedSession.followUpState = {
            //     level: 1,
            //     flaggedAt: Date.now(),
            //     context: serviceName || 'unknown_service',
            //   };
            // }
            break;
          }


          case 'updateRepaintDetailsTool': {
            const { serviceName, color, specific_part, motor } = args;
            updatedSession.inquiry.repaintDetails = updatedSession.inquiry.repaintDetails || {};
            updatedSession.inquiry.repaintDetails[serviceName] = {
              ...(updatedSession.inquiry.repaintDetails[serviceName] || {}),
              ...(color && { color }),
              ...(specific_part && { specific_part }),
              ...(motor && { motor }),
            };
            if (motor && !updatedSession.inquiry.lastMentionedMotor) {
              updatedSession.inquiry.lastMentionedMotor = motor;
            }
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = [serviceName];
            }
            break;
          }

          default: {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = [serviceName];
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
