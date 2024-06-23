import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Post from '@/components/mypage/Post';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';

interface Props {
  boardType: BoardType;
  isDeleteWarningModalOpen: boolean;
  setIsDeleteWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilterContent: '최신순' | '작성순';
}
const MyPageNormalAndTipBoardList = (props: Props) => {
  const { boardType, isDeleteWarningModalOpen, setIsDeleteWarningModalOpen, setDeletePostId, selectedFilterContent } =
    props;
  const [ref, inView] = useInView();
  const { userPostsList, setSize } = useGetUserPosts(boardType, selectedFilterContent == '최신순' ? 'ASC' : 'DESC');

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
      setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const tipTopElement = () => {
    return (
      <div className={'pb-2'}>
        <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
      </div>
    );
  };

  const bottomElement = (postId: number) => {
    return (
      <div className={'flex justify-end gap-x-2'}>
        <button className={'bg-gray0 py-2 px-4 rounded-[12px]'}>수정</button>
        <button
          onClick={() => {
            setIsDeleteWarningModalOpen(!isDeleteWarningModalOpen);
            setDeletePostId(postId);
          }}
          className={'bg-black text-white py-2 px-4 rounded-[12px]'}>
          삭제
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={'flex flex-col gap-y-4'}>
        {userPostsList.map((userPosts: AxiosResponse<ResponsePostType>) => {
          return userPosts?.result.content.map((userPost: PostType) => {
            return (
              <div key={userPost.postId} ref={ref}>
                <Post
                  postId={userPost.postId}
                  content={userPost.postContent.content}
                  title={userPost.postContent.title}
                  commentCount={userPost.postStatus.commentCount}
                  createdAt={'2023.7.12'}
                  bottomElement={bottomElement(userPost.postId)}
                  imageUrl={userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null}
                  likeCount={userPost.postStatus.likeCount}
                  topElement={userPost.recommendTags ? tipTopElement() : null}></Post>
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default MyPageNormalAndTipBoardList;
