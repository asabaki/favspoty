
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { v4 } from 'uuid'
type Data = {
    name: string
}
const client_id = 'd0097a7c6d9141fa8f2acc9d16ada3cb'
const redirect_uri = 'http://localhost:3000/api/callback';
var stateKey = 'spotify_auth_state';


export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>
) {
    var state = v4();
    // res.cookie(stateKey, state);
    res.setHeader('Set-Cookie', serialize(stateKey, state))

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
}
