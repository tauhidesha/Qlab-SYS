// @file: src/ai/tools/testAllTools.ts
// Script untuk test semua tools AI secara otomatis

import { toolFunctionMap } from '../config/aiConfig';

async function testTool(toolName: string, args: any) {
  const toolObj = toolFunctionMap[toolName];
  if (!toolObj || typeof toolObj.implementation !== 'function') {
    console.warn(`[testAllTools] Tool '${toolName}' not found or invalid.`);
    return;
  }
  try {
    const result = await toolObj.implementation(args);
    console.log(`\n=== [${toolName}] ===`);
    console.log('Input:', args);
    console.log('Output:', result);
  } catch (err) {
    console.error(`[testAllTools] Error executing tool '${toolName}':`, err);
  }
}

async function main() {
  // Daftar test case untuk setiap tool
  const tests: { tool: string; args: any }[] = [
    { tool: 'getMotorSizeDetails', args: { motor_query: 'nmax' } },
    { tool: 'getPromoBundleDetails', args: { motor_query: 'vario' } },
    { tool: 'getServiceDescription', args: { service_name: 'coating' } },
    { tool: 'getSpecificServicePrice', args: { service_name: 'coating', size: 'M' } },
    { tool: 'listServicesByCategory', args: { category: 'coating' } },
    // Tambahkan test case lain sesuai tools Anda
  ];

  for (const t of tests) {
    await testTool(t.tool, t.args);
  }
}

main();
