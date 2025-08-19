import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: 'Server is missing OPENWEATHER_API_KEY.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const rawCity = (searchParams.get('city') || '').trim();
  const units = (searchParams.get('units') || 'metric').toLowerCase();

  if (!rawCity) {
    return NextResponse.json({ message: 'Please provide a city name.' }, { status: 400 });
  }

  const allowed = ['metric', 'imperial'];
  const safeUnits = allowed.includes(units) ? units : 'metric';

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(rawCity)}&appid=${apiKey}&units=${safeUnits}`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });
    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message || 'Failed to fetch weather.';
      const status = data?.cod && Number.isFinite(+data.cod) ? Number(data.cod) : res.status;
      return NextResponse.json({ message: msg }, { status: status || 502 });
    }

    const dto = {
      city: data.name,
      country: data.sys?.country ?? '',
      temperature: data.main?.temp,
      condition: data.weather?.[0]?.main ?? '',
      description: data.weather?.[0]?.description ?? '',
      icon: data.weather?.[0]?.icon
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : ''
    };

    return NextResponse.json(dto, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 502 }
    );
  }
}
