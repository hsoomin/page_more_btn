let $container=$('.gallery'),
    $loadMoreBtn=$('.load-more'),
    $addItemCount=8,  //클릭할때마다 보여지는 갯수
    $added=0,  //더보기 버튼, 다 나타나면 사라질 용도
    $allDate=[]; //배열 json파일 불러와서 넣을 공간


    //masonry
    $container.masonry({
        // options
        itemSelector: '.gallery-item',
        columnWidth: 270,
        gutter:20
    });


    $.getJSON('./data/content.json',function(data){
        // console.log(data)
        $allDate=data;

        addItem();
        $loadMoreBtn.click(addItem)  //클릭하면 addItem이 들어오게 (slicedData=$allDate.slice($added,$addItemCount) 를 계속 가져오는거->slice($added,$added += $addItemCount)로 변경)
    })

    function addItem(data){
        let element=[]; //배열로 8개씩 만들 공간
        let slicedData;

        slicedData=$allDate.slice($added,$added += $addItemCount)  //0~8까지 잘라오는거
        console.log(slicedData)

        $.each(slicedData,function(idx,item){
            let itemHTML=
            `<li class="gallery-item">
                <a href="">
                    <figure>
                        <img src="${item.images.thumb}" alt="${item.title}">
                        <figcaption>
                            ${item.title}
                        </figcaption>
                    </figure>
                </a>
            </li> `;
            element.push($(itemHTML).get(0))
        });

        $container.append(element);

        //40개 다 나오면 btn 숨길 수 있게
        if($added<$allDate.length){
            $loadMoreBtn.show()
        }else{
            $loadMoreBtn.hide()
        }


        $container.imagesLoaded( function() {
            $container.masonry('appended',element)
        });
    }