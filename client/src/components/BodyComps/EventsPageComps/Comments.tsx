import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import { IComment } from "../../../models/IComment";
import CommenntService from "../../../services/CommentService";
import { Link } from "react-router-dom";
import DateFormater from "../../UniversalComps/DateFormater";

type LocalParams = {
  eventId: string;
};

const Comments = ({ eventId }: LocalParams) => {
  const { store } = useContext(Context);
  const [comments, setComments] = useState<IComment[]>([]);
  const [content, setContent] = useState<string>("");

  const newCommentHandler = () => {
    CommenntService.newComment(store.user._id, eventId, content);
    window.location.reload();
  };

  const deleteCommentHandler = (commentId: string) => {
    CommenntService.deleteComment(commentId);
    window.location.reload();
  };

  const getData = async () => {
    await CommenntService.getComments(eventId).then((res) =>
      setComments(res.data)
    );
  };

  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  return (
    <div className="col-span-3 bg-white rounded drop-shadow flex flex-col gap-3 p-4">
      <div className="text-center text-2xl">Коментарі:</div>
      {(comments.length > 0 && (
        <div className="flex flex-col overflow-auto gap-4">
          {comments.map((comment: IComment) => {
            return (
              <div
                className="flex flex-col bg-gray-200 rounded drop-shadow p-4"
                key={comment._id}
              >
                <div className="flex justify-between">
                  <div>
                    <Link to={"/user/" + comment.commenter._id}>
                      {comment.commenter.login}
                    </Link>
                  </div>
                  <div>
                    <DateFormater value={comment.date} dayOfWeek={false} />
                  </div>
                </div>
                <div className="px-10 py-4">
                  <p> {comment.content} </p>
                </div>
                {(store.user.login == "ADMIN" ||
                  comment.commenterId == store.user._id) && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        deleteCommentHandler(comment._id);
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )) || <div className="text-center text-gray-500">коментарів нема</div>}
      <form className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={() => newCommentHandler()}>
          Надіслати коментар
        </button>
      </form>
    </div>
  );
};

export default observer(Comments);
