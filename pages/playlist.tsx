import { Card, CardHeader, Typography } from "@material-tailwind/react"
import axios from "axios"

export type Profile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: {
        spotify: string
    };
    followers: {
        href?: any;
        total: number;
    };
    href: string;
    id: string;
    images: ReadonlyArray<{
        height?: any;
        url: string;
        width?: any;
    }>;
    product: string;
    type: string;
    uri: string;

}


export async function getServerSideProps(context: { req: any }) {
    const { req } = context
    const { access_token } = req.cookies;
    axios.defaults.headers.get = {
        'Authorization': `Bearer ${access_token}`
    }
    const profile = await axios.get('https://api.spotify.com/v1/me/')
    const { data: playlist } = await axios.get('https://api.spotify.com/v1/me/playlists')
    return { props: { profile: profile.data, playlist } }
}

export default function Playlist({ profile, playlist }: { profile: Profile, playlist: any }) {
    if (!profile || !playlist) {
        return <></>
    }
    return (
        <div className="container m-4 flex flex-col">
            <Card className="w-40 h-[11rem] p-4 mr-4">
                <img src={profile.images[0].url} width={150} height={150}></img>
            </Card>
            <Card className="p-4">
                <h1>Logged in as {profile.display_name}</h1>
                <h1>ID: {profile.id}</h1>
                <h1>Email: {profile.email}</h1>
                <h1>Spotify URI: {profile.external_urls.spotify}</h1>
                <h1>Link: {profile.href}</h1>
                <h1>Country: {profile.country}</h1>
            </Card>

            <Card className="p-4 block">
                <h1>Playlists</h1>
                <div>
                    {
                        playlist.items.map((item: any) => {
                            return (
                                <div key={item.id}>
                                    <img src={item.images[0].url} width={150} height={150}></img>
                                    <span className="mr-2">{item.name}</span>
                                    <span className="mr-2">{item.tracks.total} tracks</span>
                                    <span className="mr-2">{item.href}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </Card>

        </div>
    )
}