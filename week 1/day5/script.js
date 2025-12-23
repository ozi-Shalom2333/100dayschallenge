const interactiveTips = document.querySelectorAll('.interactive-tip');
const downloadTrackerBtn = document.getElementById('downloadTracker');
const notificationGuideBtn = document.getElementById('notificationGuide');
const acceptChallengeBtn = document.getElementById('acceptChallenge');
const subscribeBtn = document.getElementById('subscribeBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const readingProgress = document.getElementById('readingProgress');
const readingPercent = document.getElementById('readingPercent');

function toggleTip(tipId) {
    const tipContent = document.getElementById(tipId);
    const tipIcon = document.querySelector(`.tip-icon[data-icon-id="${tipId}"]`);
    const isExpanded = tipContent.classList.contains('expanded');

    document.querySelectorAll('.tip-content.expanded').forEach(tip => {
        if (tip.id !== tipId) {
            tip.classList.remove('expanded');
            const otherIcon = document.querySelector(`.tip-icon[data-icon-id="${tip.id}"]`);
            if (otherIcon) {
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        }
    });

    tipContent.classList.toggle('expanded');

    if (!isExpanded) {
        tipIcon.classList.remove('fa-chevron-down');
        tipIcon.classList.add('fa-chevron-up');
    } else {
        tipIcon.classList.remove('fa-chevron-up');
        tipIcon.classList.add('fa-chevron-down');
    }
}

function downloadHabitTracker() {
    alert("Habit tracker PDF downloaded! Check your downloads folder.");
    console.log("Habit tracker download initiated");
}

function showNotificationGuide() {
    alert("Opening step-by-step guide to managing notifications on iOS and Android...");
    console.log("Notification guide opened");
}

function acceptChallenge() {
    alert("Challenge accepted! You'll receive a reminder at 8 PM tonight.");
    console.log("Daily challenge accepted");

    acceptChallengeBtn.textContent = "✓ Challenge Accepted";
    acceptChallengeBtn.style.background = "var(--success)";
    acceptChallengeBtn.disabled = true;

    updateProgress(75);
}

function updateProgress(percentage) {
    progressFill.style.width = `${percentage}%`;
    progressPercent.textContent = `${percentage}% towards your goal`;
}

function subscribeToNewsletter() {
    const email = newsletterEmail.value.trim();

    if (!email) {
        alert("Please enter your email address");
        newsletterEmail.focus();
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        newsletterEmail.focus();
        return;
    }

    subscribeBtn.textContent = "Subscribing...";
    subscribeBtn.disabled = true;

    setTimeout(() => {
        alert(`Thank you! You've been subscribed to the Digital Wellbeing newsletter.\nA confirmation email has been sent to ${email}`);
        subscribeBtn.textContent = "Subscribed!";
        subscribeBtn.style.background = "var(--success)";
        newsletterEmail.value = "";

        setTimeout(() => {
            subscribeBtn.textContent = "Subscribe";
            subscribeBtn.disabled = false;
            subscribeBtn.style.background = "";
        }, 3000);
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function updateReadingProgress() {
    const articles = document.querySelectorAll('article');
    const footer = document.querySelector('footer');

    if (!articles.length || !footer) return;

    const lastArticle = articles[articles.length - 1];
    const articleBottom = lastArticle.offsetTop + lastArticle.offsetHeight;
    const footerTop = footer.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    let progress = 0;
    if (scrollPosition < articleBottom) {
        progress = Math.min(85, Math.round((scrollPosition / articleBottom) * 85));
    } else if (scrollPosition < footerTop) {
        progress = 85 + Math.round(((scrollPosition - articleBottom) / (footerTop - articleBottom)) * 15);
    } else {
        progress = 100;
    }

    readingProgress.style.width = `${progress}%`;
    readingPercent.textContent = `${progress}%`;
}

function init() {
    console.log("Digital Wellbeing Guide initialized");

    interactiveTips.forEach(tip => {
        tip.addEventListener('click', function() {
            const tipId = this.getAttribute('data-tip-id');
            toggleTip(tipId);
        });
    });

    downloadTrackerBtn.addEventListener('click', downloadHabitTracker);
    notificationGuideBtn.addEventListener('click', showNotificationGuide);
    acceptChallengeBtn.addEventListener('click', acceptChallenge);
    subscribeBtn.addEventListener('click', subscribeToNewsletter);

    newsletterEmail.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            subscribeToNewsletter();
        }
    });

    updateProgress(65);
    updateReadingProgress();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', updateReadingProgress);

    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceName = this.textContent;
            console.log(`Resource clicked: ${resourceName}`);
            alert(`Opening ${resourceName}... (Note: This is a demo link)`);
        });
    });

    document.querySelectorAll('.tip-content').forEach(tip => {
        tip.style.maxHeight = '0';
    });
}

document.addEventListener('DOMContentLoaded', init);



if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTip,
        downloadHabitTracker,
        showNotificationGuide,
        acceptChallenge,
        subscribeToNewsletter,
        updateReadingProgress
    };
}
