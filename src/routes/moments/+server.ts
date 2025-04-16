import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/clients/supabaseClient';
import { CLOUDFLARE_TURNSTILE_SECRET } from '$env/static/private';
import { fetchIdCoords } from '$lib/services/map.service';

export const GET: RequestHandler = async () => {
  const geoJSONData = await fetchIdCoords();
  return json(geoJSONData);
}

export const POST: RequestHandler = async ({ request }) => {
  const { lng, lat, address, description, license, sources, captchaToken } = await request.json();

  if (!captchaToken) {
    return json({ error: 'CAPTCHA token is missing.' }, { status: 400 });
  }

  if (!address?.trim()) {
    return json({ error: 'A dirección non pode estar baleira.' }, { status: 400 });
  }

  const captchaVerifyUrl =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const captchaSecret = CLOUDFLARE_TURNSTILE_SECRET;

  const verifyResponse = await fetch(captchaVerifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret: captchaSecret,
      response: captchaToken
    })
  });

  const captchaResult = await verifyResponse.json();

  if (!captchaResult.success) {
    return json({ error: 'CAPTCHA verification failed.' }, { status: 400 });
  }

  // TODO: Mover a capa de servicio 
  const { error } = await supabase.from('houses').insert([
    {
      location: `SRID=4326;POINT(${lng} ${lat})`,
      status: 'pending',
      description: description?.length == 0 ? null : description,
      sources: sources.length == 0 ? null : sources,
      address: address.length == 0 ? null : address,
      license: license.length == 0 ? null : license
    }
  ]);

  if (error) {
    return json({ error: 'Error saving new moment' }, { status: 500 });
  }

  return json({}, { status: 201 });
};
