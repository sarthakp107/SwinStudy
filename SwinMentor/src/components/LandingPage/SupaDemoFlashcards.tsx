const SupaDemoFlashcards = () =>{

    return (
    <>
    <section className="bg-white py-20 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-0">Turn any PDF to Flashcards Instantly ⚡</h2>
        <div className="w-full max-w-5xl mx-auto" style={{
        position: "relative",
        boxSizing: "content-box",
        maxHeight: "80vh",
        width: "100%",
        aspectRatio: "1.8103448275862069",
        padding: "40px 0",
        }}
        >
            
            <iframe
                src="https://app.supademo.com/embed/cm9ppjaca6aquljv5yqanr55e?embed_v=2"
                loading="lazy"
                title="Swinstudy.com"
                allow="clipboard-write"
                allowFullScreen
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    </section>
    </>
    )
}

export default SupaDemoFlashcards;