import {
    Router
} from 'express';
import {
    catchAsync
} from '../middleware/error';
import {
    generateAccessToken,
    authenticateToken
} from '../utils/tokenUtils'
import User from '../models/user'

const router = Router();


router.post('/login', catchAsync(async (req, res) => {
    const {
        username,
        password
    } = req.body
    User.findOne({
        username,
        password
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        }

        if (password != user.password) {
            return res.status(401).send({
                message: "Invalid Password!"
            });
        }

        const token = generateAccessToken({
            username
        });
        res.send({
            token
        });
    });
}));

router.post('/register', catchAsync(async (req, res) => {
    const {
        username,
        password,
        biography,
        picture
    } = req.body
    const add_user = new User({
        username,
        password,
        biography,
        picture
    });

    User.findOne({
        username
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (user) {
            return res.status(500).send({
                message: "User is already exits."
            });
        }

        add_user.save(err => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            const token = generateAccessToken({
                username
            });
            res.send({
                token
            });
        })

    });
}));


router.put('/user', authenticateToken, catchAsync(async (req, res) => {
    User.updateOne({
        username: req.user.username
    }, req.body).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        res.send({
            "message": "success"
        })
    })
}));


router.get('/user/current', authenticateToken, catchAsync(async (req, res) => {
    User.findOne({
        username: req.user.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        res.send({
            user
        })
    })
}));


router.get('/users', catchAsync(async (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        const data = users.map(item => {
            return {
                username: item.username,
                biography: item.biography,
                picture: item.picture
            }
        })
        res.send({
            data
        })
    })
}));


router.put('/logout', catchAsync(async (req, res) => {
    res.send({
        "message": "success"
    })
}));



export default router;