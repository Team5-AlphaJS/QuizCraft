import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useState } from "react";
import PropTypes from "prop-types";



const CategorySelect = ({ quiz, setQuiz }) => {
    const [categories, setCategories] = useState({
        history: 'History',
        math: 'Math',
        science: 'Science',
        chemistry: 'Chemistry',
        biology: 'Biology'
    });


    const [newCategory, setNewCategory] = useState('');

    const onAddCategory = () => {
        if (newCategory === '') {
            console.log('Category cannot be empty string');
            return;
        }

        const categoryKey = newCategory.toLocaleLowerCase();
        if (categoryKey in categories) {
            console.log('That category exists!');
            return;
        }
        const categoryValue = newCategory.slice(0, 1).toUpperCase() + newCategory.slice(1).toLocaleLowerCase();
        setCategories({ ...categories, [categoryKey]: categoryValue });
        setNewCategory('');
        // console.log(newCategory);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select category</DialogTitle>
                    <DialogDescription>You must select category </DialogDescription>
                    <DialogDescription>Or if you do not find the one you need you can add it.</DialogDescription>
                </DialogHeader>
                <Select onValueChange={(value) => setQuiz({ ...quiz, category: value })}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {Object.keys(categories).map(category => <SelectItem key={category} value={category}>{categories[category]}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex create-category">
                    <Input className="w-96 mr-2" placeholder="ex: physics" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <Button className="border" onClick={onAddCategory}>Add</Button>
                </div>


            </DialogContent>
        </Dialog>
    );
};

CategorySelect.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default CategorySelect;