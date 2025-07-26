import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const symbol = searchParams.get("symbol");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        if (!symbol) {
            return NextResponse.json(
                { error: 'Symbol parameter missing' }, 
                { status: 400 }
            );
        }

        const apiKey = process.env.API_KEY || 'krpO612s7B8fqC7YxzLi0dSsTQhZU3K8';
        const params = new URLSearchParams({
            symbol: symbol.toUpperCase(),
            apikey: apiKey,
        });

        if (from) params.append('from', from);
        if (to) params.append('to', to);

        const apiUrl = `https://financialmodelingprep.com/stable/historical-price-eod/full?${params.toString()}`;
        console.log('Fetching data from:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (err) {
        console.error('API Error:', err);
        return NextResponse.json(
            { error: 'Failed to fetch financial data' },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}