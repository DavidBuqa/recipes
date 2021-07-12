import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { randomRecipes, successfulResponse } from '../../Utils/api';

const useStyles = makeStyles((theme) => ({
    loading: {
        padding: '60px 20px 0 20px'
    },
    loadingMargin: {
        margin: 'auto'
    },
    card: {
        paddingLeft: 10,
        paddingRight: 10
    }
}));

const RecipeList = props => {
    const classes = useStyles();
    const [recipes, setRecipes] = React.useState([]);
    const [responseErr, setResponseErr] = React.useState(false);
    const [loading, setLoading] = React.useState(recipes.length === 0);

    const fetchRandomRecipes = async (number = 5) => {
        setLoading(true);
        setResponseErr(false);
        const response = await axios.get(randomRecipes(number));

        if (successfulResponse(response)) {
            setRecipes(response.data.recipes);
        } else {
            setResponseErr(true);
        }

        setLoading(false);
    };

    React.useEffect(() => {
        fetchRandomRecipes();
    }, []);

    return (
        <Grid container item justifyContent="center" className={classes.loading}>
            {
                loading ?
                <CircularProgress className={classes.loadingMargin} color="inherit" size={100} /> : (
                    responseErr ? 
                        <Alert severity="error">Pri nalaganju receptov je prišlo do napake!</Alert> :
                        recipes.map((recipe, index) => (
                            <Grid className={classes.card} item xs={12} sm key={index}>
                                <RecipeCard recipe={recipe} />
                            </Grid>
                        ))
                )
            }
        </Grid>
    );
};

export default RecipeList;