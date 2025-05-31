import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const token = process.env.GITHUB_TOKEN;

export async function main() {
    console.log('Testing GitHub Models with exact sample code...');
    console.log('Token length:', token ? token.length : 'NO TOKEN');
    
    const client = ModelClient(
        "https://models.github.ai/inference",
        new AzureKeyCredential(token),
        {apiVersion:"2024-12-01-preview"}
    );

    try {
        // Test 1: Exact sample code
        console.log('\n=== Test 1: Exact Sample Code ===');
        const response1 = await client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "developer", content: "" },
                    { role: "user", content: "Can you explain the basics of machine learning?" }
                ],
                model: "openai/o4-mini"
            }
        });

        if (isUnexpected(response1)) {
            console.error('Test 1 failed:', response1.body.error);
        } else {
            console.log('Test 1 SUCCESS:', response1.body.choices[0].message.content.substring(0, 100) + '...');
        }

        // Test 2: Our current approach with system role
        console.log('\n=== Test 2: System Role ===');
        const response2 = await client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: "Say hello in one sentence." }
                ],
                model: "openai/o4-mini"
            }
        });

        if (isUnexpected(response2)) {
            console.error('Test 2 failed:', response2.body.error);
        } else {
            console.log('Test 2 SUCCESS:', response2.body.choices[0].message.content);
        }

        // Test 3: Try different model names
        console.log('\n=== Test 3: Different Model Names ===');
        const modelNames = [
            "openai/o4-mini",
            "gpt-4o-mini", 
            "o1-mini",
            "gpt-4o"
        ];

        for (const modelName of modelNames) {
            try {
                console.log(`Testing model: ${modelName}`);
                const response3 = await client.path("/chat/completions").post({
                    body: {
                        messages: [
                            { role: "user", content: "Hi" }
                        ],
                        model: modelName
                    }
                });

                if (isUnexpected(response3)) {
                    console.log(`  ❌ ${modelName}: ${response3.body.error?.message || 'Unknown error'}`);
                } else {
                    console.log(`  ✅ ${modelName}: Works!`);
                }
            } catch (error) {
                console.log(`  ❌ ${modelName}: ${error.message}`);
            }
        }

    } catch (error) {
        console.error('Main error:', error);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
