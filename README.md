# Rendist Map

Aplicación para a monitorización e rexistro de datos de xeito comunitario sobre a situación da vivenda turística e de aluguer.

## Setup

Instalación en local:

### Desenvolvemento



1. Establecer as variables de entorno.
   1. Copia `.env.example` a `.env`.
   1. Obtén a URL `SUPABASE_URL` e a key `SUPABASE_ANON_KEY` do proxecto Supabase.
1. Instalar as dependencias con  `npm install`.
1. To start a development server: `npm run dev`.

- Podes actualizar o arquivo database.types.ts cando modifiques a BD en Supabase según o manual de [Supabase](https://supabase.com/docs/guides/api/rest/generating-types).
```bash
npx supabase gen types typescript --project-id "xxxxxxxx" --schema public > database.types.ts
```

## Despregue en PRO

Para crear unha versión de produción:

```bash
npm run build
```
// TODO

### Set up Captcha Protection

For Captcha protection of the point submissions, we use Cloudflare Turnstile. Once you create a widget there, populate the correct values for the env variables:

```bash
PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
CLOUDFLARE_TURNSTILE_SECRET
```

For more info, see this guide: https://developers.cloudflare.com/turnstile/get-started/.
