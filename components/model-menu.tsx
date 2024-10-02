'use client'
import { useState } from "react";
import {
    DropdownMenu,
    
  } from "@/components/ui/dropdown-menu"
  

export function Menu(){
    const availableModels = [
    { name: 'GPT-3.5 Turbo', model: 'gpt-3.5-turbo' },
    { name: 'GPT-4', model: 'gpt-4o-mini' },
  ];
    const [selectedModel, setSelectedModel] = useState(availableModels[0].model);
    //const [selectedModelName, setSelectedModelName] = useState(availableModels[0].name);
   

    return(
        <DropdownMenu>
        
        <select
            className="w-36 "
            value={selectedModel}
            onChange={(e) => {
                const selectedModel = availableModels.find((model) => model.model === e.target.value);
                if (selectedModel) {
                setSelectedModel(selectedModel.model);
                }
            }}
            >
            
            {availableModels.map((model) => (
                <option key={model.model} value={model.model}>
                {model.name}
                </option>
            ))}
            
      </select>
     
      </DropdownMenu>   
    )
}