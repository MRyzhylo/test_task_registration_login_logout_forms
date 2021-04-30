import { useCallback } from "react"

export const useCountryList = () => {
    return useCallback ( async text => {
        if ( text ) {
            try { 
                let select = document.querySelector('#country_select');
                    for(let i = 0; i < text.countries.length; i++) {
                        let optionItem = document.createElement('option')
                        optionItem.innerHTML = text.countries[i].country_name
                        select.appendChild(optionItem)}
                    } catch (e) {}
        }
    }, [] )
} 