import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';

const Comment = () => {
    const user_id = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const event_id = useLocation().state.event_id;
    const event_name = useLocation().state.event_name;
    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        axios.post('http://localhost:3001/event_comments', {
        event_id: event_id
        },{'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
            console.log(res.data);
            setComments(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    }

    useEffect(() => {
        fetchComments();
    }, []);


    const  handleComment = () => {
        const newcomment= {
            user_id: user_id,
            event_id: event_id,
            comment: comment,
            rating: parseInt(rating)
            }
            setComments([...comments, newcomment ]);
        axios.post('http://localhost:3001/events/comment',newcomment,
        {'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{
          console.log(res.data);
          setComment('');
        }).catch((err)=>{
          console.log(err);
        });
    }
    return (
        <div>
                <h1>Comment {event_name}</h1>
                <input type="text" placeholder="Comment" value={comment} onChange={(e)=>setComment(e.target.value)}></input>
                <input type="number" placeholder="Rating" value={rating} onChange={(e)=>setRating(e.target.value)}></input>
                <button onClick={handleComment}>Comment</button>
            <div>
            <h1>Comments</h1>
                {comments.map((comment,index) => {
                    return (

                        <div className='forms' style={{color:'white'}} key={index}>
                            <h3>{comment.user_id}</h3>
                            <h3>{comment.comment}</h3>
                            <h3>{comment.rating}</h3>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
export default Comment;