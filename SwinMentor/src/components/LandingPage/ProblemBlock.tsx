const ProblemBlock = ()=>{
    return(
    <>
    <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
        <div
  style={{
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
    title="Supademo Demo"
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
            {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Tired of Studying Alone? Notes Scattered Everywhere?</h2> */}
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 mt-20">
                Swinburne study life can be tough, but you don't have to do it alone. Our platform connects you with peers and gives you the tools to make your study time effective.
            </p>
        </div>
    </section>
    </>
    )
}

export default ProblemBlock;