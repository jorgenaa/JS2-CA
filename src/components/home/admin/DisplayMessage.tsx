const DisplayMessage = ({ messageType, children }: any) => {
    return (
       <p className={`"form__message" ${messageType}`}>{children}</p>
    );
};

export default DisplayMessage;