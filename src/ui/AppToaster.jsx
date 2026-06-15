import toast, {ToastBar, Toaster} from "react-hot-toast";

function AppToaster() {
    return (
        <Toaster
            position='top-center'
            gutter={12}
            containerStyle={{margin: '8px'}}
            toastOptions={{
                success: {
                    duration: 3000
                },
                error: {
                    duration: 5000
                },
                style: {
                    fontSize: '16px',
                    maxWidth: '500px',
                    padding: '16px 24px',
                    backgroundColor: 'var(--color-grey-0)',
                    color: "var(--color-grey-700)"
                }
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== "loading" && (
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    style={{
                                        marginLeft: "auto",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "2px 4px",
                                        color: "var(--color-grey-500)",
                                        fontSize: "16px",
                                        lineHeight: 1,
                                        flexShrink: 0,
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}

export default AppToaster;
