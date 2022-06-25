import axios from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


const stateKey = 'spotify_auth_state';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const redirect_uri = process.env.REDIRECT_URI;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_SECRET_ID;
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;


    if (state === null || state !== storedState || code === null) {
        res.redirect('/#' +
            new URLSearchParams({
                error: 'state_mismatch'
            }));
    } else {
        res.setHeader('Set-Cookie', `${stateKey}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        const { data } = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            code: code as string,
            redirect_uri: redirect_uri as string,
            grant_type: 'authorization_code'
        }), {
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri
            }
        });
        const { access_token, refresh_token, expires_in } = data;
        if (!access_token || !refresh_token || !expires_in) {
            res.status(500).json({
                error: 'Something went wrong',
                data: JSON.stringify(data)
            })
        }
        res.setHeader('Set-Cookie', serialize('access_token', access_token, { path: '/playlist', expires: new Date(Date.now() + (1000 * 60 * expires_in)) }));
        res.setHeader('Set-Cookie', serialize('refresh_token', refresh_token, { path: '/playlist', expires: new Date(Date.now() + (1000 * 60 * expires_in))}));
        res.redirect('/playlist');
    }
}