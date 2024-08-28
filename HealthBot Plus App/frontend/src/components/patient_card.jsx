import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ title, imageSrc, description }) {
    return (
        <Card sx={{ width: 300, height: 450 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="10"
                    image={imageSrc}
                    alt={title}
                />
                <CardContent className='items-center'>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="ul">
                        {description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
