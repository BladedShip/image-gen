export async function GET(request: Request) {

    const response = await fetch('https://image-gen-bladedship.azurewebsites.net/api/getgptsuggestion',{
        cache:"no-store",
    })

    const textData = await response.text();

    return new Response(JSON.stringify(textData.trim()),{
        status:200,
    })
  }
  