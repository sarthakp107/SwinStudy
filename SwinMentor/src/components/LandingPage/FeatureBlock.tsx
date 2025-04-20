import Feature1 from "./Feature1"
import Feature2 from "./Feature2"
import Feature3 from "./Feature3"

const FeatureBlock = () =>{
    return (
    <>
       <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">All the Tools a Swinburne Student Needs</h2>
          {/* Unit Buddies */}
          <Feature1 />
          {/* AI Flashcards */}
          <Feature2 />
           {/* Study Plans */}
          <Feature3 />
        </div>
      </section>
    </>
    )
}

export default FeatureBlock;