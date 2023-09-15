<template>
    <div class="resume-layout">
        <!-- Шапка с иконкой и текстом резюме -->
        <header>
            <div class="header-content">
                <font-awesome-icon icon="fa-solid fa-user-secret" :style="{ fontSize: '2em', color: '#ffc107' }" />
                <h1>Мое Резюме</h1>
            </div>
        </header>

        <!-- Контент из слота -->
        <main>
            <slot name="content"></slot>
        </main>

        <!-- Подвал с копирайтом и текущим годом -->
        <footer>
            <div class="footer-content">
                <p>&copy; {{ currentYear }} Мой Резюме</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "MainLayout",
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
    },
};
</script>

<style scoped>
.resume-layout {
    font-family: Arial, sans-serif;
    padding: 20px;
}

header {
    background-color: #333;
    color: #fff;
    padding: 10px 2em;
    text-align: center;
}

.header-content {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    gap: 20px;
}
main {
    padding: 20px;
    background-color: #f7f7f7;
}

footer {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
}
</style>
