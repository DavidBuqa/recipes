import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';
import { getRandomDate } from '../../Utils/helpers';

const useStyles = makeStyles((theme) => ({
    header: {
        minHeight: 80
    },
    root: {
        maxWidth: 345,
        height: 550,
        marginBottom: 100
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    summary: {
        height: 180
    }
}));

const getShorterText = (text, len) => text.length < len ? text : text.substr(0, len) + '...';

const RecipeCard = props => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link to={`/recipe/${props.recipe.id}`}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            { props.recipe.sourceName.charAt(0).toUpperCase() }
                        </Avatar>
                    }
                    title={props.recipe.title}
                    subheader={getRandomDate()}
                    className={classes.header}
                />
                <CardMedia
                    className={classes.media}
                    image={props.recipe.image}
                    title={props.recipe.title}
                />
                <CardContent className={classes.summary}>
                    <Typography variant="body2" color="textSecondary">
                        <p dangerouslySetInnerHTML={{ __html: getShorterText(props.recipe.summary, 300) }}></p>
                    </Typography>
                </CardContent>
            </Link>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;