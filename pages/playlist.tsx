import { Avatar, Box, Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import LocationOn from "@mui/icons-material/LocationOn";

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

            <Card>
                <Box sx={{ p: 2, display: 'flex' }} >
                    <Avatar variant="rounded" sx={{ width: 150, height: 150 }} src={profile.images[0].url} className="mr-4" />
                    <Stack spacing={0.5}>
                        <Typography fontWeight={700}>Logged in as {profile.display_name}</Typography>
                        <Typography variant="body2" color="text.secondary" >ID: {profile.id}</Typography>
                        <Typography variant="body2" color="text.secondary" >Email: {profile.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            <LocationOn /> {profile.country}
                        </Typography>
                    </Stack>
                </Box>
            </Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Total Song</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playlist.items.map((item: any) => {
                            return (<TableRow key={item.name}>
                                <TableCell><img src={item.images[0].url} width={150} height={150}></img></TableCell>
                                <TableCell><Typography variant="h6">{item.name}
                                    </Typography></TableCell>
                                <TableCell>{item.tracks.total}</TableCell>
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}