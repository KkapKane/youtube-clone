
import "../style/categoryBar.scss"

export default function CategoryBar() {

    const category = [{name: 'all',     id: 0},
                    {name:'sports',     id: 17}, 
                    {name:'gaming',     id: 20}, 
                    {name:'Blogs',      id: 22}, 
                    {name:'science',    id: 28}, 
                    {name:'anime',      id: 31}, 
                    {name:'music',      id: 10},
                    {name:'education',  id: 27},
                    {name:'movies',     id: 44},
                    {name:'news',       id: 25},
                    {name:'animals',    id: 15},
                    {name:'comedy',     id: 34},
                    {name:'documentary',id: 35}]

    return (
        <div className="categoryBar">
            {
                category.map((cat)=> {
                    return (
                        <div className="category" id={cat.id} onClick={()=> console.log(cat.id)}> 
                            {cat.name}
                        </div>
                    )
                })
            }
            
        </div>
    )
}