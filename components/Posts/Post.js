import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  top: 40%;
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 40%;
`;
/// added by me
const TopBar = styled.div(({}) => ({
  display: 'flex',
  padding: '7px 10px',
  gap: '10px' ,
  fontSize: '14px',
  fontWeight: 'bold',
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  justifyContent : "flex start" , 
  flexDirection : "column",
  alignItems: 'center',
  marginTop : "4px"
}));

const Avatar = styled.div(() => ({
  width: '45px',
  height: '45px',
  backgroundColor: '#808080',
  display: 'flex',
  alignItems: 'center',
  justifyContent : 'center',
  color :"white",
  borderRadius: '50%',
}));

const UserName = styled.span(() => ({
  fontSize : "15px"
}));

const Post = ({ post }) => {
  
  const carouselRef = useRef(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await axios.get(`/api/v1/users/${post.userId}`);
      setUser(user);
    };

    fetchUser();
  }, []);
  
  const handleNextClick = () => {
    const clientWidth = carouselRef.current.clientWidth;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;

      carouselRef.current.scrollBy({
        left: -clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const avatarText =
    user.name?.charAt(0) + user.name?.charAt(user.name?.indexOf(' ') + 1) || '';

  return (
    <PostContainer>
      <TopBar>
        <Avatar>{avatarText}</Avatar>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <span style={{fontSize : "11px", fontWeight: "600" ,alignSelf:"self-start"}}>{user.email}</span>
        </UserInfo>
      </TopBar>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
