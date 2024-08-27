import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  const uptimeInSeconds = process.uptime();

  // Convert uptime to a more readable format
  const days = Math.floor(uptimeInSeconds / (3600 * 24)).toString();
  const hours = Math.floor(uptimeInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(uptimeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`; // e.g. 1h 30m 15s

  const year = new Date().getFullYear();

  const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:4200';
  const adminDashboardUrl = process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000';

  return res.render('index', { uptime, year, webAppUrl, adminDashboardUrl });
});

router.get('/confirm-email', async (req, res) => {
  const token = req.query.token as string;
  const year = new Date().getFullYear();
  const serverUrl = `http://localhost:${process.env.PORT}`;

  try {
    const { method, url } = ENDPOINT_CONFIGS.verifyEmail;
    const response = await fetch(`${serverUrl}${url}`, {
      method: method.toUpperCase(),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      throw new Error(data?.message);
    }

    return res.render('confirm-email', { success: data.message, error: '', year });
  } catch (e) {
    const errMsg = (e as Error).message ?? 'Something went wrong, please try again later!';
    return res.render('confirm-email', { success: '', error: errMsg, year });
  }
});

export const views = router;
