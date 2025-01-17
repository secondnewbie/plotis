
const popupContainer = document.getElementById('popupContainer');
const openPopupButton = document.getElementById('openPopup');
const hiddenContent = document.getElementById('hiddenContent');
const dashsnopbox = document.getElementById('dashsnopbox');
const dashconcept = document.getElementById('dashconcept');
const typingContainer = document.getElementById('typingContainer');

let lastLoadedFile = null;

document.querySelectorAll('.openPopup, .openPopup2, .openPopup3, .openPopup4, .openPopup5, .openPopup6, .openPopup7, .openPopup8, .openPopupfile').forEach(button => {
  button.addEventListener('click', () => {
  const fileName = button.getAttribute('data-file');
  const targetContainerId = button.getAttribute('data-target');

  fetch(fileName)
      .then(response => response.text())
      .then(html => {
          const popupContainer = document.getElementById('popupContainer');

          if (popupContainer) {
              popupContainer.innerHTML = html;

              if (button.classList.contains('openPopup2')) {
                  displayFullContent(targetContainerId);
              }

              // 파일 업로드 이벤트 재연결
              if (button.classList.contains('openPopupfile')) {
                  initializeFileUploadEvents();
                  button.classList.add("active");
              }

              initializePopup(targetContainerId);
              document.getElementById('popupOverlay').style.display = 'flex';
          }
      })
    });
});

function initializeFileUploadEvents() {
    document.querySelector(".file_cus input[type=file]").addEventListener("change", function () {
        const fileName = this.value.split("\\").pop();
        const fileNameDisplay = this.nextElementSibling;

        if (fileNameDisplay && fileName) {
            fileNameDisplay.textContent = fileName;
        } else {
            fileNameDisplay.textContent = "파일을 선택해주세요.";
        }
    });
}

function fileCus() {
    $(document).on("change", ".file_cus input[type=file]", function () {
        const fileName = $(this).val().split("\\").pop(); // 파일명 가져오기
        $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요.");
    });
}


function displayFullContent(containerId) {
    const containerMappings = {
        typingContainer: 'contentOption',
        typingContainerz: 'contentOptionz',
        typingContainerc: 'contentOptionc',
        typingContainerp: 'contentOptionp',
        typingContainerv: 'contentOptionv',
        typingContainerdu: 'contentOptiondu',
        typingContainerb: 'contentOptionb',
        typingContainerpt: 'contentOptionpt'
    };

    const typingContainer = document.getElementById(containerId);
    const optionName = containerMappings[containerId];

    if (!optionName || !typingContainer) return;

    const selectedValue = document.querySelector(`input[name="${optionName}"]:checked`);
    const selectedContentId = selectedValue ? `hiddenContent${optionName.replace('contentOption', '')}${selectedValue.value}` : null;
    const selectedContent = document.getElementById(selectedContentId);

    if (selectedContent && typingContainer) {
        typingContainer.style.display = 'none';
        typingContainer.innerHTML = '';
    }
}


// 팝업 동작 초기화 함수
function initializePopup(targetContainerId) {
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopupButton = document.getElementById('closePopup');
    const startTypingButton = document.getElementById('startTyping');
    const dashscenpbox = document.getElementById('dashscenpbox');
    const dashsnopbox = document.getElementById('dashsnopbox');
    const dashconti = document.getElementById('dashconti');
    const dashconcept = document.getElementById('dashconcept');
    const dashscdbox = document.getElementById('dashscdbox');
    const senbtnbox = document.getElementById('senbtnbox');
    const dashbdgbox = document.getElementById('dashbdgbox');
    const dashpptbox = document.getElementById('dashpptbox');

     if (!popupOverlay) {
      console.error("팝업 오버레이가 없습니다.");
      return;
  }
    // 팝업 닫기 (X 버튼)
   if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });
    }

    // 팝업 닫기 버튼 이벤트
    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
            removeActiveState();
        });
    }

    // 바탕화면 클릭 시 닫기 (openPopupfile 제외)
    popupOverlay.addEventListener('click', (event) => {
        const isopenPopupfileActive = document.querySelector(".openPopupfile.active");
        if (!isopenPopupfileActive && event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            removeActiveState();
        }
});

    if (startTypingButton) {
        startTypingButton.addEventListener('click', () => {
            let selectedValue, selectedContentId, typingContainer;

            const containerMappings = {
                typingContainer: 'contentOption',
                typingContainerz: 'contentOptionz',
                typingContainerc: 'contentOptionc',
                typingContainerp: 'contentOptionp',
                typingContainerv: 'contentOptionv',
                typingContainerdu: 'contentOptiondu',
                typingContainerb: 'contentOptionb',
                typingContainerpt: 'contentOptionpt'
            };

            function formatPrice(value) {
            return new Intl.NumberFormat('ko-KR').format(value);
            }

            // 값 가져오기 및 표시
            function applyPriceFormatting() {
                const rows = document.querySelectorAll('tr');

                rows.forEach(row => {
                    const inputElement = row.querySelector('.prdPrice');
                    const spanElement = row.querySelector('.formattedPrice');

                    if (inputElement && spanElement) {
                        const priceValue = inputElement.value;
                        spanElement.textContent = formatPrice(priceValue);
                    }
                });
            }

            for (const [containerId, optionName] of Object.entries(containerMappings)) {
                if (targetContainerId === containerId) {
                    selectedValue = document.querySelector(`input[name="${optionName}"]:checked`);
                    selectedContentId = selectedValue ? `hiddenContent${optionName.replace('contentOption', '')}${selectedValue.value}` : null;
                    typingContainer = document.getElementById(containerId);

                    if (typeof applyPriceFormatting === 'function') {
                        applyPriceFormatting();
                    }

                    if (targetContainerId === 'typingContainerb' && dashscenpbox) {
                        dashbdgbox.style.display = 'block';
                        dashscenpbox.style.display = 'none';

                    }

                }
            }

            if (!selectedValue || !selectedContentId || !typingContainer) {
                alert("Please select a content option.");
                return;
            }

             const selectedContent = document.getElementById(selectedContentId);

             if (selectedContent && typingContainer) {
                  typingContainer.style.display = 'block';
                  typingContainer.innerHTML = selectedContent.innerHTML;
                  // 마크다운 렌더링
                 if (targetContainerId === 'typingContainerz' && dashscenpbox) {
                     dashscenpbox.style.display = 'block';
                     renderMarkdownInContainer(dashscenpbox); // 마크다운 실행
                     popupOverlay.style.display = 'none';
                 }
              }

            // 숨겨진 텍스트 가져오기
            function setDisplay(elements, displayValue, exceptions = []) {
                elements.forEach(element => {
                    if (element && !exceptions.includes(element.id)) {
                        element.style.display = displayValue;
                    }
                });
            }

            // 상태 설정
            if (targetContainerId === 'typingContainerp' && dashsnopbox) {
                dashsnopbox.style.display = 'none';
            } else {
                setDisplay([dashsnopbox, dashconti, senbtnbox], 'block');
            }

            if (targetContainerId === 'typingContainerv' && dashscenpbox) {
                dashchar.style.display = 'block';
                dashscenpbox.style.display = 'none';
            }

            if (targetContainerId === 'typingContainerdu' && dashscdbox) {
                dashscdbox.style.display = 'block';
                dashscenpbox.style.display = 'none';
            }

            if (targetContainerId === 'typingContainerb' && dashbdgbox) {
                dashbdgbox.style.display = 'block';
                dashscenpbox.style.display = 'none';
            }

            if (targetContainerId === 'typingContainerpt' && dashpptbox) {
                dashpptbox.style.display = 'block';
                dashscenpbox.style.display = 'none';
            }


            popupOverlay.style.display = 'none';
        });


    }
};
function removeActiveState() {
const activePopup = document.querySelector(".openPopupfile.active");
if (activePopup) activePopup.classList.remove("active");
}

function setViewportHeight() {
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight(); // 초기 실행
