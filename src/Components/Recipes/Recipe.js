import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { recipeById, successfulResponse } from '../../Utils/api';
import { toHHMM } from '../../Utils/helpers';
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    titleR: {
        textAlign: 'center',
        marginBottom: 50
    },
    flex: {
        display: 'flex'
    },
    image: {
        marginRight: 80,
    },
    borderRadius: {
        borderRadius: 15
    },
    ingredients: {
        border: '1px solid #FF8633',
        backgroundColor: 'rgba(255, 141, 51, 0.2)',
        paddingLeft: 30,
        paddingRight: 70
    },
    time: {
        verticalAlign: 'super',
        marginLeft: 5
    },
    iconWrapper: {
        paddingTop: 30
    },
    loading: {
        paddingTop: 100,
        textAlign: 'center'
    },
}));

const Recipe = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [recipe, setRecipe] = React.useState(null);
    const [responseErr, setResponseErr] = React.useState(false);
    const [loading, setLoading] = React.useState(!recipe || Object.keys(recipe).length === 0);

    const fetchRecipeById = async () => {
        setLoading(true);
        setResponseErr(false);
        const response = await axios.get(recipeById(id));

        if (successfulResponse(response)) {
            setRecipe(response.data);
        } else {
            setResponseErr(true);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        //let unmounted = false;
        fetchRecipeById();
        //return () => { unmounted = true };
    }, []);

    return (
        <Container>
            {
                loading ?
                <div className={classes.loading}>
                    <CircularProgress color="inherit" size={100} /> 
                </div> : (
                    responseErr ?
                        <Alert severity="error">Pri nalaganju recepta je prišlo do napake!</Alert> :
                        <>
                            <h2 className={classes.titleR}>{recipe.title}</h2>
                            <div className={classes.flex}>
                                <div className={classes.image}>
                                    <img className={classes.borderRadius} src={recipe.image} alt={recipe.image} />
                                </div>
                                <div className={`${classes.ingredients} ${classes.borderRadius}`}>
                                    <div className={classes.iconWrapper}>
                                        <AccessTimeIcon/><span className={classes.time}>{toHHMM(recipe.readyInMinutes)}</span>
                                    </div>
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {
                                            recipe.extendedIngredients.map(ingredient => (
                                                <li key={ingredient.id}>{ingredient.name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h4>Instructions</h4>
                                {
                                    recipe.instructions ?
                                    <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p> :
                                    <p>This recipe has no instructions.</p>

                                }
                            </div>
                        </>
                )  
            }

        </Container>
    );
};

export default Recipe;