import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    console.log(req.body);
    
    console.log("inside create post");


    
    try {
        const { title, excerpt, link, username, userId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : 'https://picsum.photos/200/150';

        if (!title || !excerpt || !username || !userId) {
            return res.status(400).json({ message: 'Title, excerpt, username, and userId are required' });
        }

        const newPost = new Post({
            title,
            excerpt,
            image,
            link,
            username,
            user: userId
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const loadPost = async (req,res) =>{



    try {
        

        const data = await Post.find()
        console.log(data);
        
        return res.status(200).json({message:"success",data})
    } catch (error) {
        
    }



    
    
}