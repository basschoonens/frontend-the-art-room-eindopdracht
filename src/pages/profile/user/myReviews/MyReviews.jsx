import styles from './MyReviews.module.css';
import WelcomeContent from "../../../../components/welcomeContentBar/WelcomeContent.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import formatRating from "../../../../helpers/formatRating.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";


export default function MyReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const jwt = localStorage.getItem('jwt');

        const controller = new AbortController();

        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        };

        const fetchRatingsList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/ratings/user`, config, { signal: controller.signal });
                setReviews(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatingsList();

        return () => {
            controller.abort();
        }

    }, []);

    const handleDelete = async (artworkId) => {
        const jwt = localStorage.getItem('jwt');
        const config = {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            await axios.delete(`http://localhost:8080/ratings/user/${artworkId}`, config);
            setReviews(reviews.filter(review => review.artworkId !== artworkId));
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <WelcomeContent />
            <div className={styles.reviewData}>
                <h2>My Reviews</h2>
                {loading && <p>Loading reviews...</p>}
                {error && <p>{error.message}</p>}
                <div className={styles.reviewsContainer}>
                    {reviews && reviews.length === 0 && <p>No reviews found for from yet. Please leave one on an artwork you enjoy!</p>}
                    {reviews && reviews.length > 0 && reviews.map((review) => (
                        <div key={review.ratingId} className={styles.review}>
                            <p className={styles.reviewTitle}>{review.artworkTitle}</p>
                            <p>Artist: {review.artworkArtist}</p>
                            <p>Rating: {formatRating(review.rating)}</p>
                            <p>Review: {review.comment}</p>
                            <span className={styles.delete} onClick={() => handleDelete(review.artworkId)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}