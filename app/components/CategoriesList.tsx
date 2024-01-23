//import categories data
import Link from "next/link";
import { TCategory } from "../types";

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.API_URL_BASE}/api/categories`)
    
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function CategoriesList() {
  const categories = await getCategories();
  return ( 
    <div className="flex gap-2 text-sm flex-wrap">
      {categories && categories.map(category => (
        <Link className="px-4 py-1 rounded-sm text-white bg-darkBlue hover:bg-darkBlueHover duration-500" key={category.id} href={`/categories/${category.catName}`}>{ category.catName }</Link>
      ))}
    </div>
   );
}

export default CategoriesList;