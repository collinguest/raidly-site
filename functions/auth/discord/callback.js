export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.redirect("https://raidly.pages.dev");
  }

  // 1. Exchange code for token
  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: "1464326736660398403",
      client_secret: "YOUR_CLIENT_SECRET",
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://raidly.pages.dev/auth/discord/callback"
    })
  });

  const tokenData = await tokenRes.json();

  // 2. Get user info
  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const user = await userRes.json();

  // 3. Get user's servers (guilds)
  const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const guilds = await guildRes.json();

  // 4. Encode guilds safely
  const encodedGuilds = encodeURIComponent(JSON.stringify(guilds));

  // 5. Redirect to dashboard
  return Response.redirect(
    `https://raidly.pages.dev/dashboard.html` +
    `?username=${encodeURIComponent(user.username)}` +
    `&id=${user.id}` +
    `&avatar=${user.avatar}` +
    `&guilds=${encodedGuilds}`
  );
}
