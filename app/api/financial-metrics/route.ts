import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const symbol = searchParams.get("symbol");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        console.log('API Request params:', { symbol, from, to });

        if (!symbol) {
            return NextResponse.json(
                { error: 'Symbol parameter missing' }, 
                { status: 400 }
            );
        }

        // Validate date format if provided
        if (from && !/^\d{4}-\d{2}-\d{2}$/.test(from)) {
            return NextResponse.json(
                { error: 'Invalid from date format. Use YYYY-MM-DD' }, 
                { status: 400 }
            );
        }

        if (to && !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
            return NextResponse.json(
                { error: 'Invalid to date format. Use YYYY-MM-DD' }, 
                { status: 400 }
            );
        }

        const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || 'krpO612s7B8fqC7YxzLi0dSsTQhZU3K8';
        
        if (!apiKey || apiKey === 'krpO612s7B8fqC7YxzLi0dSsTQhZU3K8') {
            console.warn('Using fallback API key. Consider setting API_KEY environment variable.');
        }

        const params = new URLSearchParams({
            symbol: symbol.toUpperCase(),
            apikey: apiKey,
        });

        if (from) params.append('from', from);
        if (to) params.append('to', to);

        const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol.toUpperCase()}?${params.toString()}`;
        console.log('Fetching data from:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Financial-Calendar-App/1.0',
            },
        });

        console.log('API Response status:', response.status);
        console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            
            if (response.status === 401) {
                return NextResponse.json(
                    { error: 'Invalid API key or unauthorized access' },
                    { status: 401 }
                );
            } else if (response.status === 429) {
                return NextResponse.json(
                    { error: 'API rate limit exceeded. Please try again later.' },
                    { status: 429 }
                );
            } else if (response.status === 404) {
                return NextResponse.json(
                    { error: `Symbol ${symbol} not found` },
                    { status: 404 }
                );
            }
            
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response data keys:', Object.keys(data));
        console.log('API Response data sample:', JSON.stringify(data).substring(0, 200) + '...');

        // Handle different response formats from FMP API
        let historicalData = data;
        if (data.historical) {
            historicalData = data.historical;
        } else if (Array.isArray(data)) {
            historicalData = data;
        } else {
            console.error('Unexpected API response format:', data);
            return NextResponse.json(
                { error: 'Unexpected API response format' },
                { status: 500 }
            );
        }

        return NextResponse.json(historicalData, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (err) {
        console.error('API Error:', err);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to fetch financial data';
        if (err instanceof Error) {
            if (err.message.includes('fetch')) {
                errorMessage = 'Network error: Unable to reach financial data provider';
            } else if (err.message.includes('JSON')) {
                errorMessage = 'Data parsing error: Invalid response from financial data provider';
            } else {
                errorMessage = err.message;
            }
        }
        
        return NextResponse.json(
            { 
                error: errorMessage,
                details: err instanceof Error ? err.message : 'Unknown error'
            },
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