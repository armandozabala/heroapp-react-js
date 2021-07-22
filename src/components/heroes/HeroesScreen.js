import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

const heroImages = require.context('../../assets/heroes', true);

export const HeroesScreen = ({ history }) => {

    const { heroeId } = useParams();


    const hero =  useMemo(() => getHeroById(heroeId), [ heroeId ])

    console.log(hero);

    const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

    if(!hero) {
        return <Redirect to="/"/>;
    }

    const handleReturn = () => {

        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();
        }

        
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    //src={`../assets/heroes/${heroeId}.jpg`}
                    src={ heroImages(`./${heroeId}.jpg`)}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={superhero}
                />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-list-group-flush">
                    <li className="list-group-item">Alter ego: {alter_ego}</li>
                    <li className="list-group-item">Publisher: {publisher}</li>
                    <li className="list-group-item">First Appearance: { first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>
                
                <button className="btn btn-outline-info"
                        onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
