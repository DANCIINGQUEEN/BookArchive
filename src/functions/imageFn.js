function createImg(photo) {
    const img = new Image()
    img.src = photo
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = (e) => reject(e)
    })
}


async function resizeImg(photo, size) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const img = await createImg(photo)

    const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
    //Math 메소드를 이용해서 canvas 크기에 이미지 배율을 맞춰 넣읗 수 있도록 한다

    let x = (canvas.width / 2) - (img.width / 2) * scale
    let y = (canvas.height / 2) - (img.height / 2) * scale

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
            //toBlob : img src 에 설정된 파일을 blob 으로 변경
            //blob : binary large object 대용량 이진 객체 / 이진 데이터를 담을수있는 객체
        }, 'image/jpeg')
    })
}

async function getBase64URL(file) {
    if (!file || !file.type.startsWith("image/"))
        throw new Error("Only jpeg, gif, png Can Be Upload")
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve)=>{
        reader.onload=(e)=>{
            resolve(e.target.result)
        }
    })
}

export {resizeImg, getBase64URL}