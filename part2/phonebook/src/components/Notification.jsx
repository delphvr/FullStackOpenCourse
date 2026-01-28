const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={message.isSuccess ? "success" : " error"}>
      {message.text}
    </div>
  );
};

export default Notification;
