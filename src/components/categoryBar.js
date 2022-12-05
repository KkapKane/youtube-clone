
import "../style/categoryBar.scss"

export default function CategoryBar({refreshCategory}) {

    const category = [{name: 'all',     id: 0},
                    {name:'sports',     id: 17}, 
                    {name:'gaming',     id: 20}, 
                    {name:'Blogs',      id: 22}, 
                    {name:'science',    id: 28}, 
                    {name:'film & animation',      id: 1}, 
                    {name:'music',      id: 10},
                    {name:'automotive', id: 17},
                    {name:'movies',     id: 1},
                    {name:'news',       id: 25},
                    {name:'animals',    id: 15},
                    {name:'comedy',     id: 23},
                    {name:'entertainment',id: 24}]

    return (
        <div className="categoryBar">
            {
                category.map((cat)=> {
                    return (
                        <div className="category"  onClick={()=> refreshCategory(cat.id)} key={cat.name}> 
                            {cat.name}
                        </div>
                    )
                })
            }
            
        </div>
    )
}