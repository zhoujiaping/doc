function range2(begin,end){
    return range3(begin,begin<=end?begin+1:begin-1,end)
}
function range3(begin,next,end){
    const step = next - begin
    if(step==0){
        throw new Error("step can't be zero!")
    }
    const list = []
    if(step>0){
        for(let i=begin;i<end;i=i+step){
            list.push(i)
        }
    }else{
        for(let i=begin;i>end;i=i+step){
            list.push(i)
        }
    }
    return list
}
function range(...args){
    if(args.length==2){
        return range2.apply(null,args)
    }else if(args.length==3){
        return range3.apply(null,args)
    }else{
        throw new Error("error number of args for range function!")
    }
}
function repeat(times,item){
    const list = []
    for(let i=0;i<times;i++){
        list.push(item)
    }
    return list
}
function rotate(rows){
    const maxLen = max(rows.map(row=>row.length))
    const newRows = range(1,maxLen+1).map(i=>[])
    rows.forEach((row,rowNum)=>{
        row.forEach((item,colNum)=>{
            newRows[colNum][rowNum] = item
        })
    })
    return newRows
}

function pad(str,len,padStr){
    let s = str
    if(str.length<len){
        s = str + repeat(len-str.length,padStr).join('')
    }
    return s
}
function max(list){
    let res = null
    let size = list.length
    for(let i=0;i<size;i++){
        if(res<list[i]){
            res = list[i]
        }
    }
    return res
}
function printTable(rows,printer=console.info){
    const maxLen = max(rows.map(it=>it.length))
    rows = [range(0,maxLen)].concat(rows)
    rows = rows.map((it,i)=>[i==0?'(index)':i-1].concat(it))
    const newRows = rotate(rows)
    const widths = newRows.map(row=>
        max(row.map(cell=>(''+cell).length))
    )
    const firstLine = '┌'+widths.map(it=>repeat(it+2,'─').join('')).join('┬')+'┐'
    printer(firstLine)
    rows.forEach((row,rowNum)=>{
        const words = []
        widths.forEach((w,i)=>{
            let v = row[i]
            if(v===undefined){
                v = ''
            }
            words.push(' '+pad(''+v,w,' ')+' ')
        })
        console.info('│'+words.join('│')+'│')
        if(rowNum == 0){
            printer('├'+widths.map(it=>repeat(it+2,'─').join('')).join('┼')+'┤')
        }
    })
    const lastLine = '└'+widths.map(it=>repeat(it+2,'─').join('')).join('┴')+'┘'
    printer(lastLine)
}

printTable([
    ['java','python',repeat(10,'javascript').join('')],
    ['go','groovy'],
    ['haskell','ocaml','scala','rust']
],console.info)