const socket = io();

const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputCategory = document.getElementById("input-category");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const inputCode = document.getElementById("input-code");
const inputStock = document.getElementById("input-stock");

const addProduct = document.getElementById("addProductForm");
const deleteButtons = document.querySelectorAll(".btnDelete");
const editButtons = document.querySelectorAll(".btnEdit");
const cardId = document.getElementById("card-id");
const container = document.getElementById("dinamic-list");

function setModalTitle(id) {
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = "Editar Producto con el ID " + id;
}

function saveChanges() {
  const id = window.localStorage.getItem("id");

  const inputEditTitle = document.getElementById("input-editTitle");
  const inputEditDescription = document.getElementById("input-editDescription");
  const inputEditCategory = document.getElementById("input-editCategory");
  const inputEditPrice = document.getElementById("input-editPrice");
  const inputEditThumbnail = document.getElementById("input-editThumbnail");
  const inputEditCode = document.getElementById("input-editCode");
  const inputEditStock = document.getElementById("input-editStock");

  const newProduct = {
    title: inputEditTitle.value,
    description: inputEditDescription.value,
    category: inputEditCategory.value,
    price: inputEditPrice.value,
    thumbnail: inputEditThumbnail.value,
    code: inputEditCode.value,
    stock: inputEditStock.value,
  };

  socket.emit("productModified", id, newProduct);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Modificado",
    showConfirmButton: true,
    confirmButtonColor: "#0d6efd",
    timer: 1500,
  });
  const modalElement = document.getElementById("exampleModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
  modalElement.addEventListener("hidden.bs.modal", () => {
    const backdropElement = document.querySelector(".modal-backdrop");
    if (backdropElement) {
      backdropElement.parentNode.removeChild(backdropElement);
    }
    document.body.style.overflow = "auto";
  });
}

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value,
    stock: inputStock.value,
  };
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Creado",
    showConfirmButton: true,
    timer: 1500,
  });
  socket.emit("new-product", newProduct);
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnEdit")) {
    const button = event.target;
    const cardId = button.getAttribute("data-id");
    window.localStorage.setItem("id", cardId);

    const modalElement = document.getElementById("exampleModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  if (event.target.classList.contains("btnDelete")) {
    const button = event.target;
    const cardId = button.dataset.id;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el producto del array original",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = cardId;
        socket.emit("delete-product", productId);
        Swal.fire("Hecho!", "Eliminaste el producto", "success");
      }
    });
  }
});

socket.on("products", (producto) => {
  container.innerHTML = producto
    .map((prod) => {
      return `
      <div class="card" style="width: 15rem; border: 1px solid black">
        <img src=${prod.thumbnail} class="card-img" alt="${prod.title}" />
        <div class="card-body text-center">
          <h6 class="card-id">ID: ${prod._id}</h6>
          <div class="card-title">
            <h4 class="m-0">${prod.title}</h4>
          </div>
          <div>
            <h6 class="m-0">${prod.category}</h6>
          </div>
          <div class="card-description">
            <p class="m-0 py-2">${prod.description}</p>
          </div>
          <div class="card-price">
            <p class="m-0">$ ${prod.price}.-</p>
          </div>
          <div class="card-item-detail">
            <p class="code m-0"><b>Code:</b> ${prod.code}</p>
            <p class="stock m-0"><b>Stock:</b> ${prod.stock}</p>
          </div>
          <div class="btnContainer">
            <a
              href="#"
              class="btn btn-primary btn-sm btnEdit"
              data-id=${prod._id}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="setModalTitle(this.getAttribute('data-id'))"
            ><i class="bi bi-pencil me-1"></i>Editar</a>
            <a
              href="#"
              class="btn btn-danger btn-sm ms-2 btnDelete"
              data-id=${prod._id}
            ><i class="bi bi-trash3 me-1"></i>Eliminar</a>
          </div>
        </div>
      </div>
      <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" id="modalHeader">
            <h2 class="modal-title fs-5" id="exampleModalLabel">Editar
              Producto
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="addProductForm">
              <div class="row">
                <div class="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editTitle"
                      placeholder="Nombre"
                    />
                    <label for="input-title"><i
                        class="bi bi-pencil-square me-1"
                      ></i>Nombre</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editDescription"
                      placeholder="Descripcion"
                    />
                    <label for="input-description"><i
                        class="bi bi-file-bar-graph me-1"
                      ></i>Descripcion</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editCategory"
                      placeholder="Categoria"
                    />
                    <label for="input-categoria"><i class="bi bi-tag me-1"></i>Categoria</label>
                 </div>
               </div>
                <div class="col-4">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editPrice"
                      placeholder="Precio"
                    />
                    <label for="input-price"><i
                        class="bi bi-currency-dollar me-1"
                      ></i>Precio</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editThumbnail"
                      placeholder="Imagen"
                    />
                    <label for="input-thumbnail"><i
                        class="bi bi-card-image me-1"
                      ></i>Imagen</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editCode"
                      placeholder="Codigo"
                    />
                    <label for="input-code"><i
                        class="bi bi-qr-code me-1"
                      ></i>Codigo</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom border-dark"
                      id="input-editStock"
                      placeholder="Stock"
                    />
                    <label for="input-stock"><i
                        class="bi bi-list-ol me-1"
                      ></i>Stock</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >Cancelar</button>
            <button
              type="button"
              class="btn btn-primary"
              id="btn-edit"
              onclick="saveChanges()"
            >Guardar</button>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
});
